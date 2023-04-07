export default function TeamInfo({ teamName }: { teamName: string }) {
  return (
    <>
      <p class="font-bold text-3xl text-gray-800 capitalize prose border-b-2 border-gray-200">
        {teamName}
      </p>
      <img
        src="/logo.svg"
        class="w-32 h-32 my-6 bg-gray-200 rounded-full"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="prose text-center bg-gray-200 text-gray-800 rounded-3xl py-4 px-2">
        This is the greatest team that the world has ever seen. Formed from the bonds of mutual
        suffering through a Shakespearean tradegy, these individuals have come together to conquer
        the world.
      </p>
    </>
  )
}
