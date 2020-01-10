import React, { useState, useEffect } from "react";
import "./SchoolInformationSlider.scss";
import SchoolInformation from "./SchoolInformation";
import { ISchool } from "src/models/Data";
import Button from "./Button";
import Icon from "./Icon";
import SearchForCompare from "./SearchForCompare";
import allSchools from "../data/SchoolExpenses.json";
import * as Url from "../utils/Url";
import { useHistory } from "react-router-dom";
import Glide from "@glidejs/glide";
import { GlideOptions } from "@glidejs/glide/dist/glide.modular.esm";

type Props = { schools: ISchool[] };

function SchoolInformationSlider({ schools }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  const selectedIds = schools.map(s => s.id);

  function notAlreadySelected(school: any): boolean {
    return !selectedIds.find(schoolId => schoolId === school.id);
  }

  function onSchoolSelected(id: string) {
    const updatedSelectedIds = Url.addId(selectedIds, id);
    const queryString = Url.toQueryString(updatedSelectedIds);
    history.push(`?${queryString}`);
    setShowSearch(false);
  }

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

  const schoolsForComparison: ISchool[] = allSchools.filter(notAlreadySelected);

  function createGlide(options: GlideOptions): Glide {
    return new Glide(".glide", options);
  }

  const glideOptions: GlideOptions = { peek: 25, rewind: false };
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
      {schools.length > 0 && (
        <Button
          className="add-school-button"
          type="default"
          onClick={() => {
            setShowSearch(true);
          }}
        >
          <Icon type="add"></Icon>
          Add school to compare
        </Button>
      )}
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {showSearch && (
              <SearchForCompare
                schools={schoolsForComparison}
                onSchoolSelected={onSchoolSelected}
                onClose={() => setShowSearch(false)}
              />
            )}
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
