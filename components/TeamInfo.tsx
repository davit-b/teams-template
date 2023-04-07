export default function TeamInfo({ teamName }: { teamName: string }) {
  return (
    <>
      <p class="font-bold text-3xl text-fourth capitalize prose border-b-2 border-fourth">
        {teamName}
      </p>
      <img
        src="/logo.svg"
        class="w-32 h-32 my-6 bg-white rounded-full"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="prose text-center bg-white text-fourth rounded-3xl py-4 px-2">
        This is the greatest team that the world has ever seen. Formed from the bonds of mutual
        suffering through a Shakespearean tradegy, these individuals have come together to conquer
        the world.
      </p>
    </>
  )
}
