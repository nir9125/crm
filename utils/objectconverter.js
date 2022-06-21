/*
*Object converter class bana rahe h--by sir
* I will have have logic to transform the object
*/

exports.usersResponse = (users)=>{
    usersResponse =[];

    users.forEach(user =>{
        this.usersResponse.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
            
        });
    })
    return usersResponse
}