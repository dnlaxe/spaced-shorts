export default function HomePage() {
  return (
    <div className="p-8 border m-8 rounded-lg">
      <h1 className="text-4xl underline mb-8">How to use:</h1>
      <ul className="flex flex-col gap-8 text-2xl">
        <li>1. Go to playlists page</li>
        <li>2. Create a playlist</li>
        <li>3. Add shorts to your playlist</li>
        <li>4. Click practice to see shorts and then decide its difficulty</li>
        <li>
          5. Spaced repitition alogorithm will then decide when to show to that
          short to you again
        </li>
      </ul>
    </div>
  );
}
