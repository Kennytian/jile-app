import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export const RespError = (res: Response, result = null, message = 'internal server error') => {
  res.send({ code: HttpStatus.BAD_REQUEST, message, data: result });
};

export const RespCatch = (res: Response, e, result = null, message = '') => {
  res.send({ code: HttpStatus.INTERNAL_SERVER_ERROR, message: message || e?.meta?.cause || 'internal server error', data: result });
};

export const RespOK = (res: Response, result = null, message = '', total = 0) => {
  const body: Record<string, any> = { code: HttpStatus.OK, message: message || 'success', data: result };
  if (total) {
    body.total = total;
  }
  res.send(body);
};
