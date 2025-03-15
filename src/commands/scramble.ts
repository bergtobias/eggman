import {
  EmbedBuilder,
  GuildMember,
  MessageFlags,
  type Interaction,
} from "discord.js";

export async function scrambleTeams(interaction: Interaction) {
  if (!interaction.isCommand()) return;
  console.log("Command received:", interaction.commandName);

  if (interaction.commandName === "scramble") {
    // Check if the user is in a voice channel
    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      return interaction.reply({
        content: "You need to be in a voice channel to use this command!",
        flags: MessageFlags.Ephemeral,
      });
    }

    const voiceChannel = interaction.member.voice.channel;

    // Get members in the voice channel (excluding bots)
    const members = voiceChannel.members.filter((member) => !member.user.bot);

    // Check if there are enough members
    if (members.size < 2) {
      return interaction.reply({
        content:
          "You need at least 2 members in the voice channel to scramble into teams!",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Shuffle members
    const memberArray = Array.from(members.values());
    const shuffledMembers = shuffleArray(memberArray);

    // Split into two teams
    const half = Math.ceil(shuffledMembers.length / 2);
    const team1 = shuffledMembers.slice(0, half);
    const team2 = shuffledMembers.slice(half);

    // Format teams
    const formatTeam = (team: GuildMember[], teamName: string) => {
      return ` \n${team.map((member) => `• ${member.displayName}`).join("\n")}`;
    };

    // Send embed with teams
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Scrambled Teams")
      .setDescription("Here are your randomly scrambled teams:")
      .addFields(
        { name: "Team 1", value: formatTeam(team1, "Team 1"), inline: true },
        { name: "Team 2", value: formatTeam(team2, "Team 2"), inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  }
}
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }
  return array;
}
