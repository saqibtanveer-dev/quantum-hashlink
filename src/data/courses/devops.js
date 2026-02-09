export const devopsCourse = {
  id: "devops",
  title: "DevOps Practices",
  syllabus: [
    { week: 1, topics: ["Introduction to DevOps culture and principles", "Overview of version control with Git and branching strategies", "Setting up a Git repository and basic Git commands"] },
    { week: 2, topics: ["Linux fundamentals: file system navigation, permissions, and user management", "Shell scripting basics for automation", "SSH key management and secure remote access"] },
    { week: 3, topics: ["Continuous Integration (CI) concepts and benefits", "Setting up a CI pipeline with GitHub Actions or GitLab CI", "Writing basic CI workflows: building and testing code"] },
    { week: 4, topics: ["Containerization with Docker: images, containers, and Dockerfile syntax", "Building and running containers locally", "Docker Compose for multi-container setups"] },
    { week: 5, topics: ["Infrastructure as Code (IaC) overview and benefits", "Introduction to Terraform: HCL syntax, providers, and resources", "Writing and applying a simple Terraform configuration"] },
    { week: 6, topics: ["Configuration management with Ansible: inventory, playbooks, and modules", "Provisioning a remote server with Ansible", "Using Ansible roles and vault for secrets management"] },
    { week: 7, topics: ["Container orchestration with Kubernetes: fundamentals of pods, deployments, and services", "Setting up a local Kubernetes cluster with Minikube or Kind", "Deploying a containerized application to Kubernetes"] },
    { week: 8, topics: ["Service discovery and load balancing in Kubernetes", "ConfigMaps and Secrets for configuration management", "Scaling applications with ReplicaSets and Horizontal Pod Autoscaler"] },
    { week: 9, topics: ["Logging and monitoring fundamentals: Prometheus and Grafana introduction", "Setting up basic monitoring for a containerized app", "Centralized logging with ELK stack (Elasticsearch, Logstash, Kibana)"] },
    { week: 10, topics: ["CI/CD pipeline for Kubernetes: using GitOps tools (Argo CD or Flux)", "Automated builds and deployments with Helm charts", "Rollback strategies and versioned deployments"] },
    { week: 11, topics: ["Security in DevOps: image scanning with Trivy or Clair", "Managing secrets with Vault or AWS Secrets Manager", "Best practices for securing CI/CD pipelines"] },
    { week: 12, topics: ["Final capstone: build a fully automated CI/CD pipeline deploying a microservices application", "Documentation, runbooks, and incident response planning", "Next steps: cloud-native architectures and advanced DevOps tooling"] },
  ],
};
