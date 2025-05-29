async function main() {
  const args = process.argv.slice(2);

  console.log("👋 Welcome to the GitHub User Activity Tracker!");
  console.log("📖 Usage: npm start github-activity <username>\n");

  const username = args[1];

  if (!username) {
    console.error("❌ Please provide a GitHub username.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching data for user ${username}: ${response.statusText}`
      );
    }
    const events = await response.json();

    if (events.length === 0) {
      console.log(`No activity found for user ${username}.`);
      return;
    }

    console.log(`📊 Activity for user ${username}:`);
    events.forEach((event: any) => {
      console.log(
        `- ${event.type} at ${new Date(event.created_at).toLocaleString()}`
      );
    });
  } catch (error: any) {
    console.error(`❌ An error occurred: ${error.message}`);
  }
}

main();
