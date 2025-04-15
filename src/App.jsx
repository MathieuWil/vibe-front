import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  const search = async () => {
    const res = await fetch(`http://localhost:3000/spotify/search/${query}`);
    const data = await res.json();
    setArtists(data);
    setAlbums([]); // reset albums
  };

  const getAlbums = async (artistId) => {
    const res = await fetch(`http://localhost:3000/spotify/artist/${artistId}/albums`);
    const data = await res.json();
    setAlbums(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Recherche Spotify</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>Rechercher</button>

      <h2>Artistes</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} onClick={() => getAlbums(artist.id)} style={{ cursor: 'pointer' }}>
            {artist.name}
          </li>
        ))}
      </ul>

      {albums.length > 0 && (
        <>
          <h2>Albums</h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {albums.map((album) => (
              <li key={album.id}>
                <img src={album.images[0]?.url} alt={album.name} width="100" />
                <p>{album.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
