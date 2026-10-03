import { spawn } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";
import { closeMainWindow, PopToRootType } from "@vicinae/api";

export default async function ScreenclipRegion() {
	const command = join(homedir(), ".local", "bin", "memeclip");

	// Close window and clear stack first, before taking screenshot
	await closeMainWindow({ popToRootType: PopToRootType.Immediate });

	// Spawn detached process so it survives closing the extension
	const child = spawn(command, [] as readonly string[], {
		detached: true,
		stdio: "ignore",
	});

	// Important: unref() lets the child continue after parent exits
	child.unref();

	return true;
}
