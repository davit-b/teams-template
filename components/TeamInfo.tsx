import { TeamName } from "../_model/_model.ts"

export default function TeamInfo({ teamName }: { teamName: string }) {
  return (
    <>
      <p class="font-bold text-3xl capitalize prose border-b-4 border-secondary text-secondary-content">
        {teamName}
      </p>
      <img
        src="/logo.svg"
        class="w-32 h-32 my-6"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="prose text-center bg-accent rounded-3xl py-4 px-2">
        This is the greatest team that the world has ever seen. Formed from the bonds of mutual
        suffering through a Shakespearean tradegy, these individuals have come together to conquer
        the world.
      </p>
    </>
  )
}
