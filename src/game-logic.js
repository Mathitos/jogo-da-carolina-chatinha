export const handleAction = (ws, msg) => {
  try {
    const data = JSON.parse(msg)
    if (data && data.action == 'greeting') {
      ws.send(`olá!`)
    } else {
      throw new Error(`unknown message received: ${msg}`)
    }
  } catch (error) {
    console.error(`error`)
    ws.send(`recebido comando desconhecido`)
  }
}
