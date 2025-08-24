import mongoose from "mongoose";

// Team Member Schema (embedded in Team)
const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true }, // Optional for members
    organization: { type: String, trim: true }, // Optional for members
    specialization: { type: String, trim: true }, // Optional for members
    role: { type: String, required: true, enum: ["قائد الفريق", "عضو"] },
    gender: { type: String, trim: true }, // Optional for members
    age: { type: String, trim: true }, // Optional for members
    skills: { type: String, trim: true }, // Optional for members
  },
  { _id: false } // Disable _id for embedded documents
);

// Main Team Schema
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
    notes: { type: String, trim: true }, // Admin notes
  },
  { 
    timestamps: true
  }
);

// Pre-save middleware to validate team size
TeamSchema.pre('save', function(next) {
  const expectedMemberCount = parseInt(this.teamNumber) - 1;
  if (this.members.length !== expectedMemberCount) {
    return next(new Error(`Expected ${expectedMemberCount} members, got ${this.members.length}`));
  }
  next();
});

// Static method to check for email conflicts
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

// Instance method to get all team member emails
TeamSchema.methods.getAllEmails = function() {
  const emails = [this.teamLeader.email];
  this.members.forEach(member => {
    if (member.email) emails.push(member.email);
  });
  return emails;
};

// Instance method to get team size
TeamSchema.methods.getTeamSize = function() {
  return 1 + this.members.length; // Leader + members
};

// Create indexes for efficient querying
TeamSchema.index({ "teamLeader.email": 1 });
TeamSchema.index({ "members.email": 1 });
TeamSchema.index({ status: 1 });
TeamSchema.index({ createdAt: -1 });

export default mongoose.model("Team", TeamSchema);
