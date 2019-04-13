function timeString(seconds, forceHours = false, ms = true) {
	if (ms) seconds /= 1000;
	if (seconds > 86400000) return 'LIVE';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds % 3600 / 60);

	return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
}

module.exports = timeString;
