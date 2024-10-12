/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone", // Keep standalone output mode
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)", // This targets all pages in the application
        headers: [
          {
            // Strict-Transport-Security (HSTS)
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // Force HTTPS for 1 year and include subdomains
          },
          {
            // X-Frame-Options
            key: "X-Frame-Options",
            value: "DENY", // Prevents the site from being displayed in iframes to mitigate clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevents MIME-type sniffing by browsers
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Enables XSS protection and instructs browsers to block the page in case of an XSS attack
          },
        ],
      },
    ];
  },
};
