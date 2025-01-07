"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getAllProjects, selectRequest } from "@/store/slices/project";
import React, { useEffect } from "react";

const ProjectsCard = () => {
  const dispatch = useAppDispatch();
  const { data, inProgress } = useAppSelector(selectRequest("getAllProjects"));

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  console.log(data);

  return <div>ProjectsCard</div>;
};

export default ProjectsCard;
