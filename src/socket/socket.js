module.exports = (http)=>{
    
    const io = require('socket.io')(http);
    
    io.on('connection', (socket)=>{
    
        console.log('User Connected');
        
        socket.on('chat-client', (msg)=>{
            
            io.emit('chat-server', msg);
            
        });
        
        socket.on('disconnect', (msg)=>{
            console.log('User Disconnected');
        });
        
    });
    
}