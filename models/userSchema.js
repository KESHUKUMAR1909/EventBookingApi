const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 60 * 1000) 
    }
});

// TTL Index
userSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);


const User = mongoose.model('User' , userSchema);
module.exports = User;