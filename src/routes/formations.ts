import{Collection,ObjectId} from 'mongodb'
import createError from 'http-errors'
const postSchema={
    body:{
        type:'object',
        properties:{
            organization:{type:'string'},
            name:{type:'string'},
            price:{type:'integer'},
            duration:{type:'integer'},
            description:{type:'string',minLength:100},
            tags:{
                type:'array',
                uniqueItems:true,
                items:{
                    type:'string',
                    enum:['frontend',
                    'backend',
                    'fullstack',
                    'mobile',
                    'data science'],
                },
            },
        },
        required:['organization','name','price','duration','description','tags'],
        additionalProperties:false
    }
}
export default async (fastify,options)=>{
     const collection:Collection=fastify.mongo.db.collection('formations')
    fastify.get('/formations',async(request,reply)=>{
        const result=await collection.find().toArray()
        if(!result.length){
            return new createError.NotFound('Not found')
       }
        return result
    })
//get be id
    fastify.get('/formations/:id',async(request,reply)=>{
        const result=await collection.findOne({_id: new ObjectId(request.params.id)})
         if(!result){
             return new createError.NotFound('Not found')
        }
        return result
    })
    fastify.post('/formations',{schema:postSchema},async(request,reply)=>{
       
        const result=await collection.insertOne(request.body)
        //return result est equivalent a un reply.send()
        return result.ops[0]
    })
    //delete one
    fastify.delete('/formations/:id',async(request,reply)=>{
        const result=await collection.findOneAndDelete({
            _id: new ObjectId(request.params.id)
        })
        if(!result.value){
            return new createError.NotFound('ERROR')
        }
        return result.value
    })
}