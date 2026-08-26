import { useState } from "react";
import AboutSliderImages from "../components/AboutManagement/AboutSliderImages";
import ExpertTeam from "../components/AboutManagement/ExpertTeam";
import OurStory from "../components/AboutManagement/OurStory";

export interface TeamMember {
  // id: number;
  name: string;
  position: string;
  experience: string;
  about: string;
  imageUrl: string;
}

const AboutManagement = () => {
  const [images, setImages] = useState<string[]>([]);
  const [id, setId] = useState<number>(1);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [members2, setMembers2] = useState<TeamMember[]>([]);

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Management</h1>

        <p className="mt-1 text-gray-500">
          Manage about page content, slider images and expert team.
        </p>
      </div>
      <OurStory
        setImages={(value) => {
          // console.log("teamMembers", members);

          setImages(value);
        }}
        setId={(v) => {
          setId(v);
        }}
        setMembers={(v) => {
          setMembers(v);
        }}
      />
      {/* console.log(); */}

      <AboutSliderImages
        images={images}
        id={id}
        setImages={(value) => {
          // console.log("Slider setter called:", value);
          setImages(value);
        }}
        setMembers={(v) => {
          setMembers(v);
        }}
        setMembers2={(v) => {
          setMembers2(v);
        }}
      />
      <ExpertTeam
        id={id}
        members={members}
        members2={members2}
        setMembers={setMembers}
      />
    </div>
  );
};

export default AboutManagement;
