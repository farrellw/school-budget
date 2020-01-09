import React from "react";
import "./SchoolInformation.scss";
import { ISchool } from "src/models/Data";
import { Card, CardHeader, CardContent } from "./Card";

type Props = {
  school: ISchool;
  schools: ISchool[];
  onClose: (id: string) => void;
};
function SchoolInformation({ onClose, school, schools }: Props) {
  return (
    <Card className="school-information" onClose={() => onClose(school.id)}>
      <CardHeader className="header">
        <h2>{school.name}</h2>
      </CardHeader>
      <CardContent>
        <dl>
          <dt>Zip Code</dt>
          <dd>63108</dd>
          <dt>Principal</dt>
          <dd>{school.principal}</dd>
          <dt>Vice Principal</dt>
          <dd>Dr. Seuss</dd>
        </dl>
      </CardContent>
    </Card>
  );
}

export default SchoolInformation;
