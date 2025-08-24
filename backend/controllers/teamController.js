import { teamRegisterSchema } from "../validators/teamValidator.js";
import Team from "../models/Team.js";
import Individual from "../models/Individual.js";

export const registerTeam = async (req, res) => {
  const startTime = Date.now();
  console.log(`🚀 Team registration attempt from IP: ${req.ip}`);
  
  try {
    // Parse and validate request data
    const parsed = teamRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = {};
      for (const e of parsed.error.errors) {
        const field = e.path[0];
        if (!errors[field]) {
          if (field === "teamLeader" || field === "members") {
            errors[field] = {};
          } else {
            errors[field] = e.message;
          }
        }
        
        // Handle nested errors for teamLeader and members
        if (field === "teamLeader" && e.path.length > 1) {
          const subField = e.path[1];
          if (!errors.teamLeader[subField]) {
            errors.teamLeader[subField] = e.message;
          }
        } else if (field === "members" && e.path.length > 2) {
          const memberIndex = e.path[1];
          const subField = e.path[2];
          if (!errors.members[memberIndex]) {
            errors.members[memberIndex] = {};
          }
          errors.members[memberIndex][subField] = e.message;
        }
      }
      
      return res.status(400).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors,
      });
    }

    const data = parsed.data;

    // Validate team size matches member count
    const expectedMemberCount = parseInt(data.teamNumber) - 1;
    if (data.members.length !== expectedMemberCount) {
      return res.status(400).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors: {
          members: `يجب أن يكون عدد الأعضاء ${expectedMemberCount}، تم إرسال ${data.members.length}`
        }
      });
    }

    // Collect all emails for conflict checking
    const allEmails = [data.teamLeader.email, ...data.members.map(m => m.email)];
    const uniqueEmails = [...new Set(allEmails)];
    
    if (uniqueEmails.length !== allEmails.length) {
      return res.status(400).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors: {
          members: "يجب أن تكون جميع البريد الإلكتروني فريدة"
        }
      });
    }

    // Check for email conflicts with existing teams
    const existingTeam = await Team.checkEmailConflicts(allEmails);
    if (existingTeam) {
      const conflictingEmails = [];
      if (allEmails.includes(existingTeam.teamLeader.email)) {
        conflictingEmails.push(existingTeam.teamLeader.email);
      }
      existingTeam.members.forEach(member => {
        if (allEmails.includes(member.email)) {
          conflictingEmails.push(member.email);
        }
      });

      return res.status(409).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors: {
          members: `البريد الإلكتروني التالي مستخدم بالفعل في فريق آخر: ${conflictingEmails.join(", ")}`
        }
      });
    }

    // Check for email conflicts with individual registrations
    const existingIndividuals = await Individual.find({
      email: { $in: allEmails }
    });

    if (existingIndividuals.length > 0) {
      const conflictingEmails = existingIndividuals.map(ind => ind.email);
      return res.status(409).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors: {
          members: `البريد الإلكتروني التالي مسجل بالفعل كفرد: ${conflictingEmails.join(", ")}`
        }
      });
    }

    // Check for phone conflicts (only for team leader)
    if (data.teamLeader.phone && data.teamLeader.phone.trim()) {
      const existingPhone = await Individual.findOne({
        phone: data.teamLeader.phone.trim()
      });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "بيانات الفريق غير صحيحة",
          errors: {
            teamLeader: {
              phone: "رقم الجوال مستخدم بالفعل"
            }
          }
        });
      }

      // Check with existing teams
      const existingTeamPhone = await Team.findOne({
        "teamLeader.phone": data.teamLeader.phone.trim()
      });

      if (existingTeamPhone) {
        return res.status(409).json({
          success: false,
          message: "بيانات الفريق غير صحيحة",
          errors: {
            teamLeader: {
              phone: "رقم الجوال مستخدم بالفعل في فريق آخر"
            }
          }
        });
      }
    }

    // Create the team
    const team = await Team.create({
      teamName: data.teamName.trim(),
      projectIdea: data.projectIdea.trim(),
      teamNumber: data.teamNumber,
      teamLeader: {
        ...data.teamLeader,
        name: data.teamLeader.name.trim(),
        email: data.teamLeader.email.toLowerCase().trim(),
        phone: data.teamLeader.phone.trim(),
        organization: data.teamLeader.organization.trim(),
        specialization: data.teamLeader.specialization.trim(),
        skills: data.teamLeader.skills.trim()
      },
      members: data.members.map(member => ({
        ...member,
        name: member.name.trim(),
        email: member.email.toLowerCase().trim(),
        phone: member.phone?.trim() || "",
        organization: member.organization?.trim() || "",
        specialization: member.specialization?.trim() || "",
        gender: member.gender || "",
        age: member.age?.trim() || "",
        skills: member.skills?.trim() || ""
      }))
    });

    // Return success response
    const responseTime = Date.now() - startTime;
    console.log(`✅ Team registration successful: ${team.teamName} (${responseTime}ms)`);
    
    return res.status(201).json({
      success: true,
      message: "تم تسجيل الفريق بنجاح",
      data: {
        teamId: team._id.toString(),
        registrationDate: team.createdAt,
        teamSize: parseInt(team.teamNumber),
        leaderEmail: team.teamLeader.email,
        teamName: team.teamName
      },
    });

  } catch (error) {
    console.error("❌ Team registration error:", error);

    // Handle validation errors from mongoose
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({
        success: false,
        message: "بيانات الفريق غير صحيحة",
        errors
      });
    }

    // Handle duplicate key errors
    if (error?.code === 11000) {
      if (error.keyPattern?.teamName) {
        return res.status(409).json({
          success: false,
          message: "بيانات الفريق غير صحيحة",
          errors: {
            teamName: "اسم الفريق مستخدم بالفعل"
          }
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم",
      error: error.message,
    });
  }
};

export const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "الفريق غير موجود"
      });
    }

    return res.status(200).json({
      success: true,
      data: team
    });

  } catch (error) {
    console.error("❌ Get team error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم",
      error: error.message,
    });
  }
};

export const updateTeamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const team = await Team.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "الفريق غير موجود"
      });
    }

    return res.status(200).json({
      success: true,
      message: "تم تحديث حالة الفريق بنجاح",
      data: team
    });

  } catch (error) {
    console.error("❌ Update team status error:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم",
      error: error.message,
    });
  }
};
