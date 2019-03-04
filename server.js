const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')

const exec = require('child_process').exec

app.get('/', (req, res) => { 
        res.send('Hello world')
    }
)

app.get('/reset', (req, res) => { 
    


    let yourscript = exec('sh clean_model.sh',
        (error, stdout, stderr) => {
            console.log('library was initialized');

            // send the results.txt to the frontend
            try {
                let data = fs.readFileSync('./qnap_code/result.txt', 'utf8')

                
                fs.writeFile('results.txt', data, (err) => {
                    if(err)
                        return console.log(err);
                    console.log('Wrote the file successfully to result txt');
                })


            } catch(e) {
                console.log('Error', e.stack);
            }
            
        });
    res.send('library was reinitialized')
    }
)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    }    
)


