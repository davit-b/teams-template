import { useCallback } from "https://esm.sh/preact@10.11.0/hooks"
import { RemoveInput } from "../_model/_model.ts"

export default function RemoveButton({ githubId, teamName }: RemoveInput) {
  const handleRemove = useCallback(async () => {
    const request: RemoveInput = {
      teamName,
      githubId,
    }
    try {
      const response = await fetch("api/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      switch (response.status) {
        case 200: {
          location.reload()
          break
        }
        default: {
          throw new Error("Failed to remove")
        }
      }
    } catch (e) {
      console.error("Error removing member:", e)
    }
  }, [githubId])

  return (
    <button onClick={handleRemove} class="btn btn-secondary btn-sm btn-square">
      x
    </button>
  )
}
