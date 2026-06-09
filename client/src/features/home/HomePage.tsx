export default function HomePage() {
  return (
    <div className="p-8 border m-8 rounded-lg bg-white">
      <h1 className="text-xl underline mb-8">How to use:</h1>
      <ul className="flex flex-col gap-4 text-lg">
        <li>1. Go to playlists page</li>
        <li>2. Create a playlist</li>
        <li>3. Add shorts to your playlist</li>
        <li>4. Click practice to see shorts and then decide its difficulty</li>
        <li>
          5. Spaced repitition alogorithm will then decide when to show that
          short to you again
        </li>
      </ul>
    </div>
  );
}
