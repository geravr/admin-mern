const { Schema, model } = require("mongoose");

const GroupSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  ],
});

GroupSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model("Group", GroupSchema);
