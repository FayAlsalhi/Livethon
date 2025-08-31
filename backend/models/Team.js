import mongoose from "mongoose";

// Team Member Schema (embedded in Team)
const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true }, 
    organization: { type: String, trim: true }, 
    specialization: { type: String, trim: true },
    role: { type: String, required: true, enum: ["قائد الفريق", "عضو"] },
    gender: { type: String, trim: true }, 
    age: { type: String, trim: true },
    skills: { type: String, trim: true }, 
  },
  { _id: false }
);

const TeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, trim: true, unique: true },
    projectIdea: { type: String, required: true, trim: true },
    teamNumber: { type: String, required: true, enum: ["3", "4", "5"] },
    teamLeader: { type: TeamMemberSchema, required: true },
    members: { type: [TeamMemberSchema], required: true },
    status: { 
      type: String, 
      default: "pending", 
      enum: ["pending", "approved", "rejected", "cancelled"] 
    },
    registrationDate: { type: Date, default: Date.now },
    notes: { type: String, trim: true }, 
  },
  { 
    timestamps: true
  }
);

TeamSchema.pre('save', function(next) {
  const expectedMemberCount = parseInt(this.teamNumber) - 1;
  if (this.members.length !== expectedMemberCount) {
    return next(new Error(`Expected ${expectedMemberCount} members, got ${this.members.length}`));
  }
  next();
});

TeamSchema.statics.checkEmailConflicts = async function(emails, excludeTeamId = null) {
  const query = {
    $or: [
      { "teamLeader.email": { $in: emails } },
      { "members.email": { $in: emails } }
    ]
  };
  
  if (excludeTeamId) {
    query._id = { $ne: excludeTeamId };
  }
  
  return await this.findOne(query);
};

TeamSchema.methods.getAllEmails = function() {
  const emails = [this.teamLeader.email];
  this.members.forEach(member => {
    if (member.email) emails.push(member.email);
  });
  return emails;
};

TeamSchema.methods.getTeamSize = function() {
  return 1 + this.members.length; 
};

TeamSchema.index({ "teamLeader.email": 1 });
TeamSchema.index({ "members.email": 1 });
TeamSchema.index({ status: 1 });
TeamSchema.index({ createdAt: -1 });

export default mongoose.model("Team", TeamSchema);
