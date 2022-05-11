var Userdb=require('../model/model');
//create and save new user
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'Content cannot be empty'});
        return}
    //new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status})

    //save user in database
    user
    .save(user)
    .then(data=>{
        //res.send(data)
    res.redirect('/add-user')}
    ).catch(err=>{
        res.status(500);
        message:err.message||'some error occured creating a create operation'})
}

//retrieve and return single user/retreive and return all users

exports.find=(req,res)=>{

if(req.query.id){
 const id=req.query.id
 Userdb.findById(id)
 .then(data=>{
     if(!data){
         res.status(404).send('No user found with ID'+id);
     } else{
         res.send(data);}}).catch(err=>{
             res.status(500).send({message:'error retrieving user with id:'+id})})
}
else{
Userdb.find()
    .then(user=>{
        res.send(user)})
        .catch(err=>{res.status(500).send({message:err.message||'error occured while retrieving user information'});
        })}
}

//update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:'Data to update cannot be empty'})
    }
    const id =req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindandModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot update user with ${id}. Maybe user not found`})}
            else{res.send(data);}})
            .catch(err=>{
                res.status(500).send({message:'Error update user information'})})
}

//delete a user with specified user id in request 
exports.delete=(req,res)=>{
    const id =req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete with ${id}, maybe ID is wrong`})}
            else{res.send({message:'User was deleted sucessfully'})}
        }).catch(err=>{
            res.status(500).send({
                message:'Could not delete user with id'+id})})
}