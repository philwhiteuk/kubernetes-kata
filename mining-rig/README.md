Welcome to the Kubernetes "Mining Rig" Kata!

Rules:
1x mining rig = 0.1x ore p/s
1x secondary rig = 0.2x ore p/s
1x refinery = +0.9 ore p/s

Boost your mining rate:
- Improve the quality of your ore with a second rig. Copy the secret file from /blah/blah and mount it to /usr/src/app/secrets (https://kubernetes.io/docs/user-guide/kubectl/v1.7/#cp)
- Create a refinery using the image tag `philwhiteuk/mining-rig:refinery` - refineries can't actually produce anything on their own but, when linked with an existing mine rig, they will improve the mining output. (https://kubernetes.io/docs/concepts/services-networking/service/)
- The power of Kubernetes is it's reproducability! Once your team has mastered the basics on one workstation share 

Tips:
- releasing your mine as a 'Deployment' resource means that updates you make won't interrupt mining (https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- increasing pod replicas is a quick way to boost mining capacity (https://kubernetes.io/docs/user-guide/kubectl/v1.7/#scale)
- adding a healthcheck will help your service to recover when it breaks (https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)




3. create a single pod (DONE)
1. exec in pod to curl externally (DONE)

2. docker cp a file for examining locally (DONE - copy secret locally)
4. manage pod lifecycle (DONE)
5. create a deployment (multiple replicas)
6. apply environment variables (DONE)
7. create a service (linked replicas)
8. add a sidecar
