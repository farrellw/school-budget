import React from "react";
import "./SchoolInformation.scss";
import { ISchool } from "src/models/Data";
import { Card, CardHeader, CardContent } from "./Card";

type Props = {
  school: ISchool;
  schools: ISchool[];
  onClose: (id: string) => void;
  className?: String;
};
function SchoolInformation({ school, className }: Props) {
  return (
    <Card
      className={`school-information ${className}`}
    >
      <CardHeader className="header">
        <h2>{school.name}</h2>
      </CardHeader>
      <CardContent>
        <span>{school.address}</span>
        <span>{school.phone}</span>
        <dl>
          <dt>Principal</dt>
          <dd>{school.principal}</dd>
        </dl>
        <dl>
          <dt>Enrollment</dt>
          <dd>{school.projectedEnrollment}</dd>
        </dl>
      </CardContent>
    </Card>
  );
}

export default SchoolInformation;
