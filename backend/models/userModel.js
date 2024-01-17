const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        isAdmin : {
            type : Boolean,
            required : true,
            default : false,
        },
        pic : {
            type : String,
            required:true,
            default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fanonymous-avatar-icon-25.html&psig=AOvVaw0iGKKDbIeCJhblJHKRGQWA&ust=1704872831585000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNjCq7boz4MDFQAAAAAdAAAAABAE"
        },
    },
    {
        timestamps : true,
    }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User',userSchema);

module.exports = User;

