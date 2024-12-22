import Photo from './Photo';
import ContactMe from '../ContactMe';
const SelfIntroduce = () => {
  return (
    <div className='px-24 py-6 flex items-center gap-24 border-b border-gray-500 '>
      <Photo />
      <div className='flex flex-col gap-4'>
        <div className='text-text-main'>
          <h1 className="text-2xl font-bold mb-4">Hello, I&apos;m Tim</h1>
          <p className="text-lg leading-relaxed">
            I&apos;m a passionate Frontend Developer specializing in modern web technologies.
          </p>
          <p className="text-lg mt-3 leading-relaxed">
            My expertise includes React, Next.js, Vue.js, and Nuxt.js. I&apos;m also proficient
            with Docker for containerization and Git for version control.
          </p>
          <p className="text-lg mt-3 leading-relaxed">
            I regularly share my experiences about web development on this blog.
            Feel free to explore my articles and connect with me.
          </p>
          <p className="text-lg mt-3 leading-relaxed">
            I&apos;m always excited to exchange ideas and learn from fellow developers!
          </p>
        </div>
        <ContactMe />
      </div>
    </div >
  );
};

export default SelfIntroduce;