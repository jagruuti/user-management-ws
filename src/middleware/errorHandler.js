//const {validationResult} =require('express-validator');
module.exports = (err, req, res, next) => {
console.error(err.stack);
//    const errors = validationResult(req);
//    if (!errors.isEmpty()){
//        return res.status(400).json({
//        errors: errors.array()
//        });
//    }

   res.status(500).json({
   message: 'Internal Server Error',
   error: err.message
   });
};