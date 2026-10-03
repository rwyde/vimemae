import { spawn } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";
import {
	Action,
	ActionPanel,
	closeMainWindow,
	Form,
	Icon,
	PopToRootType,
	showToast,
	Toast,
} from "@vicinae/api";

function getTimestamp() {
	const now = new Date();
	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

export default function ScreenshotRegion() {
	return (
		<Form
			actions={
				<ActionPanel>
					<Action.SubmitForm
						title="Take Screenshot"
						icon={Icon.Camera}
						shortcut={{ modifiers: [], key: "return" }}
						onSubmit={async (values) => {
							const command = join(homedir(), ".local", "bin", "memecap");
							const submittedName =
								typeof values.name === "string" ? values.name.trim() : "";
							const name = submittedName || getTimestamp();

							if (name === "." || name === ".." || name.includes("/")) {
								await showToast({
									style: Toast.Style.Failure,
									title: "Invalid screenshot name",
									message: "Use a file name, not a path.",
								});
								return;
							}

							// Close window and clear stack first, before taking screenshot
							await closeMainWindow({ popToRootType: PopToRootType.Immediate });

							// Spawn detached process so it survives closing the extension
							const child = spawn(command, [name], {
								detached: true,
								stdio: "ignore",
							});

							// Important: unref() lets the child continue after parent exits
							child.unref();

							return true;
						}}
					/>
				</ActionPanel>
			}
		>
			<Form.TextField
				id="name"
				title="Name"
				// defaultValue={getTimestamp()}
				autoFocus={true}
			/>
		</Form>
	);
}
