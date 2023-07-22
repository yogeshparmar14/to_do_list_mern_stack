const Joi = require('joi');

const authValidation = async (req,res,next)=>{
        const schema = Joi.object({
            name: Joi.string()
                .min(3).message("the minimum number of string characters required is 3 or more")
                .max(30).message("the maximum number of string characters required is 3o or less than")
                .pattern(new RegExp(/^[a-zA-Z ]*$/)).message("Name can only contain alphabets")
                .required(),
            phone:Joi.number()
            .required(),
            email: Joi.string()
                .email().message("Please enter valid Email")
                .required(),
        
            password: Joi.string()
               .required()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})")).message("the password should contain lowercase, uppercase and alphanumeric value"),
            userType:Joi.string()
                .pattern(new RegExp(/(ADMIN|USER)/)).message(`usertype should be 'ADMIN' or 'USER'`)
           
    }).unknown(true)

    try{
        const value = await schema.validateAsync(req.body,{abortEarly:false});
       next();
    } catch (error) {
        const errors = {};
        error.details.forEach(detail => {
            errors[detail.context.key]=detail.message;
        });

         res.status(400).send({
            data: {},
            errors
            })
    }

}

module.exports = authValidation;