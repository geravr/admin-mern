const { Schema, model } = require("mongoose");

const PermissionSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

PermissionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model("Permission", PermissionSchema);
