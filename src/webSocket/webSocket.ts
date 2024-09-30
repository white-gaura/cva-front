import {onMounted, onUnmounted, ref,} from 'vue';

export const useWebSocket = (url: string) => {
    const socket = ref<WebSocket | null>(null);
    const messages = ref<{}>();
    const inputMessage = ref<{}>(); // Updated to accept JSON
    const connect = () => {
        socket.value = new WebSocket(url);

        socket.value.onopen = () => {
            console.log('WebSocket 连接');
        };

        socket.value.onmessage = (event) => {
            console.log("获取到消息了:" + event.data)
            const json= JSON.parse(event.data);
            messages.value = json
        };

        socket.value.onclose = () => {
            console.log('WebSocket 关闭');
        };

    };


    const send = () => {
        if (socket.value && socket.value.readyState === WebSocket.OPEN) {
            console.log("inputMessage.value:" + inputMessage.value);
            socket.value.send(JSON.stringify(inputMessage.value)); // Stringify JSON before sending
            inputMessage.value = '';
        } else {
            console.error('WebSocket not connected');
        }
    };

    const close = () => {
        if (socket.value) {
            socket.value.close();
        }
    };

    onMounted(connect);
    onUnmounted(close);

    return {messages, inputMessage, connect, send, close};
}