import React, { useState, useEffect } from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { ISchool } from "src/models/Data";
import * as Url from "../utils/Url";
import { useHistory } from "react-router-dom";
import Glide from "@glidejs/glide";
import { GlideOptions } from "@glidejs/glide/dist/glide.modular.esm";

type Props = { schools: ISchool[] };

function SchoolInformationSlider({ schools }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  function onSchoolClose(schoolId: string) {
    const schoolIds = Url.removeId(
      schools.map(s => s.id),
      schoolId
    );
    if (schoolIds.length <= 0) {
      setShowSearch(false);
    }
    const queryString = Url.toQueryString(schoolIds);
    history.push(`?${queryString}`);
  }

  function createGlide(options: GlideOptions): Glide {
    return new Glide(".glide", options);
  }

  const glideOptions: GlideOptions = {
    peek: 25,
    rewind: false,
    bound: true,
    perView: Math.min(5, schools.length),
    breakpoints: {
      512: {
        perView: 1
      },
      768: {
        perView: 2
      },
      1024: {
        perView: Math.min(3, schools.length)
      },
      1224: {
        perView: Math.min(4, schools.length)
      }
    }
  };
  const [glide, setGlide] = useState(createGlide(glideOptions));

  useEffect(() => {
    glide.mount();
  }, [glide]);

  useEffect(() => {
    const startAt = showSearch ? 0 : Math.max(glide.index - 1, 0);
    setGlide(
      createGlide({
        ...glideOptions,
        startAt
      })
    );

    if (glide) {
      glide.destroy();
    }
  }, [showSearch, schools]);

  return (
    <div className="school-information-slider">
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {schools.map(school => (
              <li className="glide__slide" key={school.id}>
                <SchoolInformation
                  school={school}
                  schools={schools}
                  onClose={onSchoolClose}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SchoolInformationSlider;
