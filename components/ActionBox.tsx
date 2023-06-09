import InviteModal from "../islands/InviteModal.tsx"

export interface ActionBoxProps {
  teamId: string
  teamName: string
  memberQuery: string
}

export default function ActionBox({ teamId, teamName, memberQuery }: ActionBoxProps) {
  return (
    <div class="flex justify-between p-2 border-b-2 border-slate-300">
      <form>
        <input
          type="text"
          name="name"
          value={memberQuery}
          class="input input-bordered w-full max-w-xs"
          placeholder="Search by name"
        />
        <button type="submit" />
      </form>
      <InviteModal teamId={teamId} teamName={teamName} />
      <label htmlFor="my-modal-3" className="text-white btn bg-first border-first">
        Invite Member
      </label>
    </div>
  )
}
