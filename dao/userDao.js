var $sql = require('./userSqlMapping');
var connectionPool = require('./connectionPool');

var pool = connectionPool.pool;
var jsonWrite = connectionPool.jsonWrite;

module.exports={
    add:function(req,res,next){
        pool.getConnection(function(err,connection){
            var param = req.query || req.params;
            
            connection.query($sql.insert,
                                   [param.name,
                                    param.email,
                                    param.password],function(err,result){
                /*if(result){
                    result = {
                        code:200,
                        msg:'增加成功'
                    };
                }*/
                
                jsonWrite(res,result);
                
                connection.release();    
            });
        });
    },
    queryAll:function(req,res,next){
        pool.getConnection(function(err,connection){
            
            connection.query($sql.queryAll,function(err,result){
                if(err){
                    jsonWrite(res,err);
                }
                jsonWrite(res,result);
                connection.release();    
            });
        });
    },
}