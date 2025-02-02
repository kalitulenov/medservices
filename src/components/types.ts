

export type SprUsr = {
  id:     number,
  usrkod: number,
  usrorg: string,
  usrlog: string,
  usrpsw: string,
  usrtyp: string,
  usrfio: string,
  usrtel: string
}

export type SprOrg = {
  id:         number
  orgkod:     number
  orgcty:     number
  orgnam:     string
  orgnamshr:  string
  orgadr:     string
  orgtel:     string
  orgdmu:     string
}

export type SprUslFrm = {
  id: number
  uslfrmhsp: number
  uslfrmidn: number
  uslfrmtrf: string
  uslfrmedn: string 
  uslfrmnam: string
  uslfrmflg: boolean
  uslminlet: number
  uslmaxlet: number
}

export type SprUslSeek = {
  id: number
  usltrf: string
  uslnam: string
  usledn: string 
  uslminlet: number
  uslmaxlet: number
  uslhspnam: string
}