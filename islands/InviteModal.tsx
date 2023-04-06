import { useCallback, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { NewUserInput } from "../_model/_model.ts"

export default function InviteModal({ teamId, teamName }: { teamId: string; teamName: string }) {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label htmlFor="my-modal-3" className="absolute btn btn-sm btn-circle right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Add a member</h3>
          <p className="py-4">
            Here you can add a member to this team by typing in their{" "}
            <span class="font-bold">exact github Id.</span>{" "}
            If they are already in the team, you will be unable to add them.
          </p>
          <InviteUser {...{ teamId, teamName }} />
        </div>
      </div>
    </div>
  )
}

function InviteUser({ teamId, teamName }: { teamId: string; teamName: string }) {
  const [fields, setFields] = useState<NewUserInput>({
    teamId,
    githubId: "",
    teamName,
  })
  const [error, setError] = useState(false)
  const [invalidGithubError, setInvalidGithubError] = useState(false)
  const [duplicateError, setDuplicateError] = useState(false)

  const handleChange = useCallback((e: JSX.TargetedEvent<HTMLInputElement, Event>, key: string) => {
    const element = e.target as HTMLInputElement
    setFields({ ...fields, [key]: element.value })

    // Reset error on new key strokes
    setError(false)
    setInvalidGithubError(false)
    setDuplicateError(false)
  }, [fields])

  const handleSubmit = useCallback(async (e: Event) => {
    e.preventDefault()
    if (fields.githubId === "") return

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      })

      switch (response.status) {
        case 200: {
          location.reload()
          break
        }
        case 400: {
          const duplicate = await response.text()
          console.error("Error submitting form on duplicate", duplicate)
          setDuplicateError(true)
          break
        }
        case 406: {
          console.error("Github ID user does not exist", fields.githubId)
          setInvalidGithubError(true)
          break
        }
        default: {
          throw new Error("Failed to submit form")
        }
      }
    } catch (e) {
      setError(true)
      console.error("Error submitting form:", e)
    }
  }, [fields])

  return (
    <form class="flex justify-between items-center ">
      <input
        type="text"
        name="githubId"
        placeholder="Enter Github username"
        value={fields.githubId}
        onInput={(e) => handleChange(e, "githubId")}
      />
      {error && <p class="text-error-content">Error Submitting Form</p>}
      {invalidGithubError && <p class="text-error-content">Invalid GithubID</p>}
      {duplicateError && <p class="text-error-content">User already added</p>}

      <button class="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  )
}
