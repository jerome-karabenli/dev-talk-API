module.exports = (token) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body style="height: 600px;">
    
      <header>
        <a href="https://ochalet-api.herokuapp.com/">O'chalet</a>
      </header>
    
      <main style="height: 100%; display:flex; flex-direction: column; justify-content: space-evenly; align-items: center;">
        
      <a href="http://localhost:3000/confirm_reset?token=${token}" target=blank>Allez click, aucun risque</a>
      <p>${token}</p>
    
        
    
      </main>
    
      <footer style="line-height: 30%;">
        <p>O'chalet</p>
        <p>Mail: ochaleto@gmail.com</p>
        <p>Tel: 0178459620</p>
      </footer>
      
    </body>
    </html>
    `
  }