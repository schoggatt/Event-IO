"use client";
import Image from "next/image";
import profilePic from "@/app/assets/profile_picture.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="text-center">
        <section className="text-white-600 body-font">
          <div className="container px-5 mx-auto flex flex-col">
            <div className="lg:w-5/6 mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="inline-flex items-center justify-center text-gray-400">
                    <Image
                      className="rounded-full w-40 h-40"
                      alt="profile-picture"
                      src={profilePic}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-white-900 text-lg">
                      Sam Hoggatt
                    </h2>
                    <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4"></div>
                    <p className="text-base">
                      Hello, I am the designer of this small webapp. I designed
                      this app for seamless organization of events, bringing
                      friends closer through shared experiences. Join the fun
                      and camaraderie with this user-friendly platform.
                    </p>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4">
                    {`Event.IO is your ultimate online destination for
                    effortlessly planning and participating in events of all
                    kinds. With an intuitive and user-friendly interface, this
                    website allows you to easily post your own events, from
                    intimate gatherings to large-scale conferences, and share
                    them with a global audience. Additionally, Event.IO provides
                    a comprehensive directory of upcoming events, making it a
                    breeze to discover and join exciting happenings in your area
                    or beyond. Whether you're a seasoned event organizer or
                    simply looking for the next great experience, Event.IO is
                    your go-to platform for connecting with like-minded
                    individuals and creating memorable moments.`}
                  </p>
                  <Link
                    href="/contactme"
                    className="text-yellow-500 inline-flex items-center"
                  >
                    Contact Me
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
