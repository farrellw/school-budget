import React from "react";
import "./SchoolInformation.scss";
import { ISchool } from "src/models/Data";
import { Card, CardHeader, CardContent } from "./Card";
import { useHistory } from "react-router-dom";

type Props = {
  school: ISchool;
  schools: ISchool[];
};
function SchoolInformation({ school, schools }: Props) {
  const history = useHistory();
  return (
    <Card
      className="school-information"
      onClose={() => {
        const schoolIds = schools
          .map(s => s.id)
          .filter(id => id !== school.id)
          .map(id => `id=${id}`)
          .join("&");
        history.push(`?${schoolIds}`);
      }}
    >
      <CardHeader className="header">
        <h2>{school.name}</h2>
      </CardHeader>
      <CardContent>
        <dl>
          <dt>Zip Code</dt>
          <dd>63108</dd>
          <dt>Principal</dt>
          <dd>Dr. Rick Marshall</dd>
          <dt>Vice Principal</dt>
          <dd>Dr. Seuss</dd>
        </dl>
      </CardContent>
    </Card>
  );
}

export default SchoolInformation;
