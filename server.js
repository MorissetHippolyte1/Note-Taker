const express = require('express');
const { getNotes } = require('./db/store');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.get("/api/notes", function(req, res) {
    getmyfileandsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].contact(JSON.parse(data))
        res.json(notes);
    })
});

app.post("/api/notes", function(req, res) {
    const note = req.body;
    readfileandsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.lenght + 1
        notes.push(note);
        return notes
      }).then(function(notes) {
          writefileandsync("./develop/db/db.json", JSON.stringify(notes))
          res.json(note)
      })
    });

    app.delete("/api/notes/:id", function(req, res) {
        const idtodelete = parseInt(req.params.id); 
            readfileandsync("./develop/db/db.json", "utf8").then(function(data) {
                const notes = [].contact(JSON.parse(data));
                const newnotedata = []
                for (let i = 0; i<notes.lenght; i++) {
                    if(idtodelete !== notes[i].id) {
                        newnotedata.push(notes[i])
                    }
                }
                return newnotedata
             }).then(function(notes) {
                 writefileandsync("./develop/db/db.json", JSON.stringify(notes))
                 res.send('its saved success!!!')
             })
        })
    

        app.get("/notes", function(req, res) {
            res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
        })

        app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "./develop/public/index.html"));
        })

        app.get("*", function(req, res) {
            res.sendFile(path.join(__dirname, "./develop/public/index.html"));
        })

        
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
