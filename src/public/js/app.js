Vue.config.productionTip = false;
const socket = io();

const app = new Vue({
    data(){
        return {
            messageAlert: '',
            nickTemp: '',
            img: 'http://placekitten.com/g/20'+Math.round(Math.random()*10)+'/20'+Math.round(Math.random()*10),
            nick: '',
            message: '', //mensaje individual del usuario
            messages: [], //array de los mensajes
        }
    },
    methods: {
        definirNick: function(){
            if(this.nickTemp==''){
                this.messageAlert = 'Debes poner un nick valido :)'
            }else{
                this.messageAlert = ''
                this.nick = this.nickTemp;
            }
        },
        enviarMensaje: function(){
            if(this.message!=''){
                socket.emit('chat-client', {
                    nick: this.nick,
                    img: this.img,
                    message: this.message,
                    date: new Date().toLocaleTimeString() + ' del ' + new Date().toLocaleDateString()
                })
                this.message = '';
            }
        }
    },
    mounted(){
        socket.on('chat-server', (msg)=>{
            this.messages.push(msg);
            setTimeout(()=>{
                const chatContainer = document.querySelector('.chat-container');
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        })
    }
}).$mount('#app');