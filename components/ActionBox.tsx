import InviteModal from "../islands/InviteModal.tsx"

export interface ActionBoxProps {
  teamId: string
  teamName: string
  memberQuery: string
}

export default function ActionBox({ teamId, teamName, memberQuery }: ActionBoxProps) {
  return (
    <div class="flex justify-between p-2 border-b-4">
      <form>
        <input
          type="text"
          name="name"
          value={memberQuery}
          class="input input-bordered input-secondary w-full max-w-xs"
          placeholder="Search by name"
        />
        <button type="submit" />
      </form>
      <InviteModal teamId={teamId} teamName={teamName} />
      <label htmlFor="my-modal-3" className="btn btn-primary">Invite New Member</label>
    </div>
  )
}
