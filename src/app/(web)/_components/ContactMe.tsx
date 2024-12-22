const ContactMe = () => {
  return (
    <div className="flex gap-4 items-center">
      <a
        href="https://www.linkedin.com/in/%E5%BA%AD%E6%8F%9A-%E9%99%B3-0a169a20b/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#0077B5] text-white rounded hover:opacity-80 transition-opacity"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/tf00185077"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#333] text-white rounded hover:opacity-80 transition-opacity"
      >
        GitHub
      </a>
      <a
        href="https://line.me/ti/p/hTbpDm6LFC"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#06C755] text-white rounded hover:opacity-80 transition-opacity"
      >
        Line
      </a>
    </div>
  );
};

export default ContactMe;