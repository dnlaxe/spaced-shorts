export default function HomePage() {
  return (
    <div className="p-8 border m-8 rounded-lg bg-white">
      <ul className="flex flex-col gap-4 text-lg">
        <li>
          <span className="font-black text-xl mr-2">1</span> Go to playlists
          page
        </li>
        <li>
          <span className="font-black text-xl mr-2">2</span> Create a playlist
        </li>
        <li>
          <span className="font-black text-xl mr-2">3</span> Add shorts to your
          playlist
        </li>
        <li>
          <span className="font-black text-xl mr-2">4</span> Click practice to
          see shorts and then decide its difficulty
        </li>
        <li>
          <span className="font-black text-xl mr-2">5</span> Spaced repetition
          algorithm will then decide when to show that short to you again
        </li>
      </ul>
    </div>
  );
}
