// server.js

const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/Song');
const path = require('path');

// Create an Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/music');

// Middleware to serve static files (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Create the database and insert documents
app.get('/create', async (req, res) => {
  const songs = [
    { Songname: 'Song1', Film: 'Film1', Music_director: 'Director1', singer: 'Singer1' },
    { Songname: 'Song2', Film: 'Film2', Music_director: 'Director2', singer: 'Singer2' },
    { Songname: 'Song3', Film: 'Film3', Music_director: 'Director3', singer: 'Singer3' },
    { Songname: 'Song4', Film: 'Film4', Music_director: 'Director1', singer: 'Singer4' },
    { Songname: 'Song5', Film: 'Film5', Music_director: 'Director2', singer: 'Singer5' },
  ];

  await Song.insertMany(songs);
  res.send('Database created and songs inserted!');
});

// Route to display all songs
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  res.send(`
    <html>
      <body>
        <h1>Song List</h1>
        <p>Total Songs: ${songs.length}</p>
        <table border="1">
          <tr>
            <th>Song Name</th>
            <th>Film Name</th>
            <th>Music Director</th>
            <th>Singer</th>
            <th>Actor</th>
            <th>Actress</th>
          </tr>
          ${songs.map(song => `
            <tr>
              <td>${song.Songname}</td>
              <td>${song.Film}</td>
              <td>${song.Music_director}</td>
              <td>${song.singer}</td>
              <td>${song.Actor}</td>
              <td>${song.Actress}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `);
});

// Route to list songs by a specific music director
app.get('/songs/music-director/:name', async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.name });
  res.send(`
    <html>
      <body>
        <h1>Songs by ${req.params.name}</h1>
        <table border="1">
          <tr>
            <th>Song Name</th>
            <th>Film Name</th>
            <th>Music Director</th>
            <th>Singer</th>
          </tr>
          ${songs.map(song => `
            <tr>
              <td>${song.Songname}</td>
              <td>${song.Film}</td>
              <td>${song.Music_director}</td>
              <td>${song.singer}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `);
});

// Route to list songs by a specific music director and singer
app.get('/songs/music-director/:director/singer/:singer', async (req, res) => {
  const songs = await Song.find({
    Music_director: req.params.director,
    singer: req.params.singer,
  });
  res.send(`
    <html>
      <body>
        <h1>Songs by ${req.params.director} sung by ${req.params.singer}</h1>
        <table border="1">
          <tr>
            <th>Song Name</th>
            <th>Film Name</th>
            <th>Music Director</th>
            <th>Singer</th>
          </tr>
          ${songs.map(song => `
            <tr>
              <td>${song.Songname}</td>
              <td>${song.Film}</td>
              <td>${song.Music_director}</td>
              <td>${song.singer}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `);
});

// Route to delete a song
app.get('/delete/:songName', async (req, res) => {
  await Song.deleteOne({ Songname: req.params.songName });
  res.send(`Song "${req.params.songName}" deleted!`);
});

// Route to add a new song
app.get('/add', async (req, res) => {
  const newSong = new Song({
    Songname: 'My Favourite Song',
    Film: 'My Favourite Film',
    Music_director: 'My Favourite Director',
    singer: 'My Favourite Singer',
  });
  await newSong.save();
  res.send('New song added!');
});

// Route to list songs by a specified singer from a specific film
app.get('/songs/film/:film/singer/:singer', async (req, res) => {
  const songs = await Song.find({ Film: req.params.film, singer: req.params.singer });
  res.send(`
    <html>
      <body>
        <h1>Songs sung by ${req.params.singer} from ${req.params.film}</h1>
        <table border="1">
          <tr>
            <th>Song Name</th>
            <th>Film Name</th>
            <th>Music Director</th>
            <th>Singer</th>
          </tr>
          ${songs.map(song => `
            <tr>
              <td>${song.Songname}</td>
              <td>${song.Film}</td>
              <td>${song.Music_director}</td>
              <td>${song.singer}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `);
});

// Route to update song document by adding Actor and Actress
app.get('/update/:songName', async (req, res) => {
  await Song.updateOne(
    { Songname: req.params.songName },
    { $set: { Actor: 'Actor1', Actress: 'Actress1' } }
  );
  res.send(`Updated song "${req.params.songName}" with Actor and Actress!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
