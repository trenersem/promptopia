import Feed from '@/components/Feed';
import '@/styles/globals.css';

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text  text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">
           AI-Powred Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an oprn-source AI promping
        tool for modern world to
        discover, create and share creative prompts
      </p>

      <Feed />
    </section>
  )
}
