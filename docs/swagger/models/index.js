const user = require("./user")
const subject = require("./subject")
const subjectReferences = require("./subject_references")
const comment = require("./comment")
const auth = require("./auth")

module.exports = {
    paths:{
        '/user':{
            ...user.getUser,
            ...user.updateUser,
            ...user.changePassword,
            ...user.deleteUser
        },
        
        '/subject':{
            ...subject.getSubjects,
            ...subject.createSubject
        },
        '/subject/{_id}':{
            ...subject.getSubject,
            ...subject.updateSubject,
            ...subject.deleteSubject
        },
        'subject/{_id}/reference': {
            ...subjectReferences.createReference,
            ...subjectReferences.deleteReference
        },
        '/comment':{
            ...comment.getComments,
            ...comment.createComment
        },
        '/comment/{_id}':{
            ...comment.getComment,
            ...comment.updateComment,
            ...comment.deleteComment
        },
        '/login':{
            ...auth.login
        },
        '/register':{
            ...auth.register
        },
        '/recovery':{
            ...auth.lostPassword
        }

    }
}